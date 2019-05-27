import * as React from 'react';
import { IRootState, ThunkDispatch } from '../store';
import { login, logout } from '../redux/auth/actions';
import { connect } from 'react-redux';
import { ConnectedRank } from '../components/dashboard/Ranking';
import { ConnectedHistory } from '../components/dashboard/BetHistory';
import './MemberPage.css'

interface IMemberPageProps{
    isAuthenticated : boolean
    login:(username:string, password:string) => void
    logout:()=>void
}

class MemberPage extends React.Component<IMemberPageProps>{

    public render(){
        return(
            <div className="member-page">
                <ConnectedHistory />
                <ConnectedRank />

            </div>

        )

    }
}

const mapStateToProps = (state:IRootState) => {
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch:ThunkDispatch) =>({
        login:(username:string, password:string)=> dispatch(login(username,password)),
        logout: ()=>dispatch(logout())
})

export const ConnectedMemberPage = connect(mapStateToProps,mapDispatchToProps)(MemberPage)