import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { isEmpty } from './../Utils'
import LikeButton from './LikeButton'
import { updatePost } from '../../actions/post.actions'
import DeleteCard from './DeleteCard'

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdated, setIsUpdated] = useState(false)
    const [textUpdate, setTextUpdate] = useState(null)
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false)
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-header">
                        <div className="email">
                            <h3>
                                {!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) return user.email
                                        else return null
                                    })}
                            </h3>
                        </div>
                        <span>{dayjs(post.createdAt).format('DD/MM/YYYY HH:mm')}</span>
                    </div>
                    {isUpdated === false && <p>{post.message}</p>}
                    {isUpdated && (
                        <div className="update-post">
                            <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                            <div className="button-container">
                                <button className="btn" onClick={updateItem}>
                                    Modifier le message
                                </button>
                            </div>
                        </div>
                    )}
                    {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}
                    {(userData._id === post.posterId || userData._id === process.env.REACT_APP_ADMIN_ID) && (
                        <div className="button-container">
                            <div onClick={() => setIsUpdated(!isUpdated)}>
                                <img src="./img/icons/edit.svg" alt="edit" />
                            </div>
                            <DeleteCard id={post._id} />
                        </div>
                    )}
                    <div className="card-footer">
                        <LikeButton post={post} />
                    </div>
                </>
            )}
        </li>
    )
}

export default Card
