import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import { preview } from "../assets"
import { FormField } from "../components"
import { getRandomPrompt } from "../utils"


const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name:'',
        prompt:'',
        photo:'',
    })

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false)

  return (
    <div>
    <section className="mx-auto">

    </section>
    </div>
  )
}

export default CreatePost