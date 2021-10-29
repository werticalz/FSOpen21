import React, { useState } from "react"
import Togglable from "./Togglable"



const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')
    const [likes, setLikes] = useState('')

    const handleAddBlog = (event) => {
        event.preventDefault()
        addBlog({
            title: title,
            author: author,
            url: url,
            likes: likes,
        })
        setTitle('')
        setAuthor('')
        setURL('')
        setLikes('')
    }
    return (
        <Togglable buttonLabel='Add a blog post'>
            < form onSubmit={handleAddBlog} >
                <div>
                    Heading:
                    <input
                        type='text'
                        name='Heading'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input type='text'
                        name="URL"
                        value={url}
                        onChange={({ target }) => setURL(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input type='text'
                        name='Author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Likes:
                    <input type='number'
                        name='Likes'
                        value={likes}
                        onChange={({ target }) => setLikes(target.value)}
                    />
                </div>
                <button type="submit">Save</button>
            </form >
        </Togglable>
    )
}

export default BlogForm