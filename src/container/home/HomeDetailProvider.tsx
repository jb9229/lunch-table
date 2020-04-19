import * as React from 'react';

import { ActivityCommonErrorData, ActivityDto, UniidInfo } from '../../components/Activity/types';
import { ActivityGroup, ActivityType, DefaultNavigationProps } from '../../types';
import { GET_ACTIVITIES_OF_GROUP, GET_GROUP_DETAIL, TOTAL_POINT } from '../../gql/queries';
import { GroupDataType, getLocalAllAddress } from '../../utils/LocalStorage/LocalStorageUtils';
import { noticeUserError, setLocalGroupInfo, validateActivityTitleInGroup } from '../../components/Activity/shared/request';
import reducer, { Action, ActionType, getActivityAddress, requestCreatActivity, setErrorMsg, validateActivityCommonData } from '../../components/Activity/create/action';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import ActionCreators from '../actions';
import { Animated } from 'react-native';
import { ApolloError } from 'apollo-client';
import { CREATE_ACTIVITY } from '../../gql/mutations';
import { CreateActivityDto } from '../../components/Activity/create/types';
import { CrtActivityResponse } from '../../components/Activity/create/create';
import { GROUP_ADDRESS_KNOWN } from '../../components/Activity/create';
import LocalStorage from '../../utils/LocalStorage';
import { Provider } from '../context/CreateActivityContext';
import getString from '../../STRINGS';
import { store } from '../store';
import { useWeb3Provider } from './Web3Provider';

// Set State
export interface State {
  step: number;
  availPoint: number;
  crtActivityDto: CreateActivityDto;
  basicDataError: ActivityCommonErrorData;
  parentActivityId: string | undefined;
}

export class InitalState {
  constructor() {
    this.step = 0;
    this.crtActivityDto = new CreateActivityDto();
    this.basicDataError = new ActivityCommonErrorData();
  }

  step: number;
  availPoint = 0;
  crtActivityDto: CreateActivityDto;
  basicDataError: ActivityCommonErrorData;
  parentActivityId: string | undefined;
}

export type Reducer = (state: State, action: Action) => State;

interface Props {
  children?: React.ReactElement;
  navigation: DefaultNavigationProps;
  groupId: string;
  nickname: string;
  publicGroup: boolean;
  parentActivityId: string | undefined;
}

const CreateActivityProvider = (props: Props): React.ReactElement => {
  // Component mount / unmount / update
  React.useEffect(() => {
    setLocalGroupInfo(props.groupId)
      .then((groupInfo: GroupDataType | null) => {
        if (groupInfo) {
          setGroupMemberAddress(groupInfo.address);
          getLocalAllAddress()
            .then((addressArr: Array<string>): void => {
              if (addressArr) {
                totalPoint({ variables: { addresses: addressArr }, context: { headers: { participantAddress: groupInfo.address } } });
              }
            }).catch((err) => noticeUserError('CreateActivityProvider', 'Load Local Storage Value Error!', `Error Message: ${err.message}`));
          groupRequest({ variables: { id: props.groupId }, context: { headers: { participantAddress: groupInfo.address } } });
        } else {
          setGroupMemberAddress(GROUP_ADDRESS_KNOWN);
          groupRequest({ variables: { id: props.groupId }, context: { headers: { participantAddress: GROUP_ADDRESS_KNOWN } } });
        }
      }).catch((err) => noticeUserError('CreateActivityProvider', 'Load Local Storage Value Error!', `Error Message: ${err.message}`));
  }, [props.navigation.state]);

  // Server Query States
  const [totalPoint] = useLazyQuery(TOTAL_POINT, {
    onCompleted(data) {
      if (data && data.totalPoint) {
        if (data.totalPoint > 0)
        {
          dispatch({ type: ActionType.SetAvailPoint, payload: { avilPoint: data.totalPoint } });
        } else
        {
          store.dispatch(ActionCreators.popupAction({
            visibility: true,
            header: getString('create_activity.CREATE_ACT_COMMON0_KEY1'),
            body: getString('create_activity.CREATE_ACT_COMMON0_KEY2'),
            onConfirm: () => { store.dispatch(ActionCreators.popupAction({ visibility: false })); props.navigation.navigate.goBack() },
            confirmText: getString('BTN_CLOSE')
          }));
        }
      }
    },
    onError(error: ApolloError) {
      noticeUserError('CreateActivityContainer', 'Get Total Point Response Error!', `Error Message: ${error.message}`);
    }
  });
  const [groupRequest, GetGroupResponse] = useLazyQuery(GET_GROUP_DETAIL, {
    onCompleted() {
      store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
    },
    onError(error: ApolloError) {
      store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
      noticeUserError('CreateActivityProvider(Get Group Info Error!)', 'Please try again', error?.message);
    }
  });
  const [createActivity, crtActivityResponse] = useMutation(CREATE_ACTIVITY, {
    update(cache, { data: { createActivity } }) {
      if (!props.parentActivityId)
      {
        const { groupActivities } = cache.readQuery({ query: GET_ACTIVITIES_OF_GROUP, variables: { id: props.groupId } });
        if (createActivity && groupActivities) {
          cache.writeQuery({
            query: GET_ACTIVITIES_OF_GROUP,
            data: { groupActivities: groupActivities.concat([createActivity]) },
            variables: { id: props.groupId }
          });
        }
      }
    },
    onCompleted(data: any) {
      if (data && data.createActivity) {
        const resData: CrtActivityResponse = data.createActivity;
        if (resData.groupId && resData.activityId && resData.creatorId && activityAddress) {
          LocalStorage.saveActivityCreateInfo(resData, activityAddress)
            .then((result) => {
              if (result) {
                store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
                props.navigation.navigate('ActivityDetail', { groupId: resData.groupId, activityId: resData.activityId, activityType: resData.activityType, refresh: true });
              } else {
                store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
                noticeUserError('CreateActivityContainer', 'Activity Save Localstorage Fail!!', `Error env: result, resData.activityId is ${result}, ${resData.activityId}`);
              }
            })
            .catch((error) => {
              store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
              noticeUserError('CreateActivityContainer', 'Local storage update failed!', `Error Message: ${error.message}`);
            });
        };
      } else {
        store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
        noticeUserError('CreateActivityContainer', 'Create Activity Submit Error!', `Error Message: Response Data(groupid, activityid, activityAddress) is ${data.groupId}, ${data.activityId}, ${activityAddress}`);
      }
    },
    onError(error: ApolloError) {
      store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
      noticeUserError('CreateActivityContainer', 'Create Activity Submit Error!', `Error Message: ${error.message}`);
    }
  });

  // States and variable
  const { getTr } = useWeb3Provider();
  const scrollOffsetY = React.useRef(new Animated.Value(0)).current;
  const titleRef = React.useRef(null);
  let group: ActivityGroup | undefined;
  if (GetGroupResponse.data && GetGroupResponse.data.group) { group = GetGroupResponse.data.group }
  const [groupMemberAddress, setGroupMemberAddress] = React.useState<string>('temp_address');
  const [cancelConfirmVisible, setCancelConfirmVisible] = React.useState(false);
  const [activityAddress, setActivityAddress] = React.useState<string>('');
  const [state, dispatch] = React.useReducer<Reducer>(reducer, new InitalState());

  // Define Action List
  const actions = {
    setCancelConfirmVisible,
    setCommonActivityData: (activityCommonData: ActivityDto, nextAction: () => void): void =>
    {
      validateActivityCommonData(props.groupId, activityCommonData, state.basicDataError, groupMemberAddress, titleRef)
        .then((isValid: boolean) =>
        {
          if (isValid)
          {
            nextAction();
          } else
          {
            setErrorMsg(dispatch)(state.basicDataError);
          }
        })
        .catch((err) => noticeUserError('CreateActivityProvider(setCommonActivityData error)', 'Please try again', `Error Message: ${err?.message}`));
    },
    selectActivityType: (type: ActivityType): void => { scrollOffsetY.setValue(0); dispatch({ type: ActionType.SelectActivityType, payload: { activityType: type } }) },
    naviPre: (): void => { scrollOffsetY.setValue(0); dispatch({ type: ActionType.PreStep, payload: {} }) },
    naviNext: (): void => { scrollOffsetY.setValue(0); dispatch({ type: ActionType.NextStep, payload: {} }) },
    initalData: (): void => dispatch({ type: ActionType.InitalData, payload: { groupId: props.groupId } }),
    onClickSubmit: (): void => {
      store.dispatch(ActionCreators.loadingAniModal({ visibility: true, step: 0 }));
      validateActivityTitleInGroup(props.groupId, state.crtActivityDto.title, groupMemberAddress)
        .then((result) => {
          if (!result)
          {
            store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));

            const eData = new ActivityCommonErrorData();
            eData.setTitle(getString('create_activity.CREATE_ACT_D1-4_KEY1'));
            setErrorMsg(dispatch)(eData, 1);
            titleRef.current.focus();
            return false;
          } else
          {
            store.dispatch(ActionCreators.loadingAniModal({ visibility: true, step: 1 }));

            getActivityAddress()
              .then((fetchAccountResult: any) => {
                if (fetchAccountResult && fetchAccountResult.value && fetchAccountResult.value.address && group && group.id && group.title)
                {
                  store.dispatch(ActionCreators.loadingAniModal({ visibility: true, step: 2 }));
                  const uniidInfo: UniidInfo = fetchAccountResult.value;
                  setActivityAddress(uniidInfo.address);
                  requestCreatActivity(props.parentActivityId, createActivity, group, groupMemberAddress, state.crtActivityDto, uniidInfo, getTr);
                }
                else {
                  store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
                  noticeUserError('CreateActivityProvider(getActivityAddress error)', '', `Error Message: UniidInfo address is ${fetchAccountResult?.value?.address}, group is ${group?.id}/${group?.title}`);
                }
              })
              .catch((error: any) => {
                store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
                noticeUserError('CreateActivityProvider(Create Activity Address Request Error!)', 'Pleas try again', `Error Message: ${error.message}`);
              });
          }
        })
        .catch((err) => {
          store.dispatch(ActionCreators.loadingAniModal({ visibility: false }));
          noticeUserError('Discussion Title Duplicate Check', 'Try Again', err.message); return false;
        });
    }
  };

  return (
    <Provider value={{ state, titleRef, crtActivityResponse, activityAddress, cancelConfirmVisible, scrollOffsetY, publicGroup: props.publicGroup, ...actions }}>{props.children}</Provider>
  );
};

export default CreateActivityProvider;
