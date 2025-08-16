import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'

const Welcome = () => {

    const [slogan, setSlogan] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading1, setIsLoading1] = useState(false)
    const [ai, setAi] = useState('')
    const [answer, setAnswer] = useState("")

    const getSlogan = async () => {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/slogan`;

        try {
            setIsLoading(true)
            const response = await axios.get(URL)
            setIsLoading(false)
            setSlogan(response?.data?.slogan)
            console.log("response", response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSlogan()
    }, [])

    const handleAi = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/bot`;
        try {
            setIsLoading1(true)
            const response = await axios.post(URL, {
                prompt: ai
            })
            setIsLoading1(false)
            console.log("response bot", response)
            if (response?.data?.success) {
                setAnswer(response?.data?.data)
                setAi("")
            }
        }
        catch (error) {
            console.log("AI error", error)
        }
    }

    return (
        <div className='bg-slate-300 w-full p-3 flex flex-col items-center justify-center gap-2'>
            <h1 className='text-6xl text-cyan-800'>Welcome to Shipments App!</h1>

            {
                isLoading ? <Spinner /> : <p className='text-xl text-cyan-800 opacity-70'>{slogan} </p>
            }

            <div className='flex flex-col gap-10'>
                <div className='flex items-center justify-center h-[150px] mt-15 w-lg mx-auto'>
                    <form onSubmit={handleAi} className='w-full relative '>
                        <textarea
                            value={ai}
                            placeholder="Need help ...."
                            onChange={(e) => setAi(e.target.value)}
                            className="bg-white text-slate-900 p-1 w-full resize-none overflow-y-auto overflow-x-visible break-words h-[150px] mt-20"
                            rows={1} // start with one row
                        ></textarea>
                        <button type='submit' className='ml-1 absolute bottom-0 right-0 cursor-pointer'><span className='text-3xl text-black hover:text-4xl hover:text-cyan-600'>ᗔ</span></button>
                    </form>

                </div>
                <div className='bg-green-200 mt-5 w-fit mx-auto'>

                    {
                        isLoading1 ? <Spinner /> : <p>{answer}</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default Welcome
