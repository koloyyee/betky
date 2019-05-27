import { ThunkResult } from '../../store';
import { Dispatch } from 'redux';
import { ITeamAction, loadTeamSuccessById, failed } from './actions';
// import { ITeamState } from './state';

const { REACT_APP_API_SERVER } = process.env

export function loadTeamById(id:number): ThunkResult<void> {
    return async (dispatch: Dispatch<ITeamAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/team/${id}`, {
            method: "GET",
        });
        const result = await res.json()
        if (res.status === 200 && result) {
            
            const teamInfo = {teamId : result.id,
                 team: result.team_name,
                failedMsg: ""}

            dispatch(loadTeamSuccessById(id, teamInfo))

        } else {
            dispatch(failed("LOAD_TEAM_FAILED", result.e));
        }
    }
}

// export function loadTeams(homeTeamId:number, awayTeamId:number): ThunkResult<void> {
//     const data= {homeTeamId, awayTeamId}
//     return async (dispatch: Dispatch<ITeamAction>) => {
//         const res = await fetch(`${REACT_APP_API_SERVER}/team/home/${id}/away${}`, {
//             method: "GET",
//             body: JSON.stringify(data)
//         });
//         const result = await res.json()
//         if (res.status === 200 && result.success) {
//             dispatch(loadTeamSuccessById(id, team))

            
//         } else {
//             dispatch(failed("LOAD_TEAM_FAILED", result.e))
//         }
//     }
// }
