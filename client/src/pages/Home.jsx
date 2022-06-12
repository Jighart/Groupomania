import React from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import Log from '../components/Log'
import NewPostForm from '../components/Post/NewPostForm'
import Thread from './../components/Thread'

const Home = () => {
    const uid = useContext(UidContext)

    return (
        <div className="home">
            <div className="home-header">{uid ? <NewPostForm /> : <Log signin={true} signup={false} />}</div>
            <Thread />
        </div>
    )
}

export default Home
