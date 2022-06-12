import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../Utils'
import { addPost, getPosts } from '../../actions/post.actions'

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [file, setFile] = useState()
    const userData = useSelector((state) => state.userReducer)
    const error = useSelector((state) => state.errorReducer.postError)
    const dispatch = useDispatch()

    const handlePost = async () => {
        if (message || file) {
            const data = new FormData()
            data.append('posterId', userData._id)
            data.append('message', message)
            if (file) data.append('file', file)

            await dispatch(addPost(data))
            dispatch(getPosts())
            cancelPost()
        } else {
            alert('Veuillez entrer un message')
        }
    }

    const cancelPost = () => {
        setMessage('')
        setFile('')
    }

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false)
    }, [userData])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="post-form">
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Quelque chose à partager aujourd'hui ?"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />

                        <div className="footer-form">
                            <div className="icon">
                                <img src="./img/icons/picture.svg" alt="img" />
                                <input
                                    type="file"
                                    id="file-upload"
                                    name="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <span className="filename">{file ? file.name : null}</span>
                            </div>
                            {!isEmpty(error.format) && <p>{error.format}</p>}
                            {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
                            <div className="btn-send">
                                {message || file ? (
                                    <button className="cancel" onClick={cancelPost}>
                                        Annuler
                                    </button>
                                ) : null}
                                <button className="send" onClick={handlePost}>
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default NewPostForm
