import React from 'react'

const Form = (props) => {
    const [formData, setFormData] = React.useState(props.review)

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(formData, props.itemId)
        props.history.push("/")    
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return(
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={formData.title} onChange={handleChange}/>
          <input type="text" name="content" value={formData.content} onChange={handleChange}/>
          <input type="text" name="author" value={formData.author} onChange={handleChange}/>
          <input type="submit" value="Send" />
        </form>
    )
}

export default Form