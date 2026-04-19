import Axios from "../context/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login =  () => {
  const navigate = useNavigate();
	const [visibility, setVisibility] = useState<string>('hidden')
	const [code, setCode] = useState<string>('')
	const [error, setError] = useState(false)

	const verify = async (e: any) => {
		e.preventDefault()
		try {
			const response = await Axios.post('auth/login/verify',{
				code: code
			})
			localStorage.setItem('token', response.data.token)
			const res = await Axios(`user/profile`)
			localStorage.setItem('user', JSON.stringify(res.data))
			navigate('/userpage')
		} catch (error) {
			setError(true)
		}
	}

  useEffect(() => {
		(async () => {
			const query = new URLSearchParams(window.location.search)
  		const code = query.get('code')
			if (!code) {
				navigate('/')
			}
			try {
				const response = await Axios(`auth/login?code=${code}`)
				if (response.data.twofa) {
					setVisibility('block')
				} else {
					localStorage.setItem('token', response.data.token)
					const res = await Axios(`user/profile`)
					localStorage.setItem('user', JSON.stringify(res.data))
					if (response.data.signup) {
						navigate('/setting')
					} else {
						navigate('/userpage')
					}
				}
			} catch(error) {
				navigate('/')
			}
		})();
  }, [])

  return (
		<div className={`w-[30rem] my-[10rem] mx-auto flex flex-col items-center shadow-2xl px-10 pb-10 rounded-3xl ${visibility}`}>
			<h2 className="my-[2rem] mx-1 text-2xl uppercase">two factor authentication</h2>
			<input placeholder="enter verification code .." type='text' value={code} onChange={(e) => setCode(e.target.value)}
				className={`w-full my-[1.5rem] p-2 text-xl rounded-lg ${error ? 'border-4 border-red-77' : ''}`} style={{ color: 'black' }} />
			<button className="rounded-xl hover:opacity-90 mb-1 p-2 text-xl bg-gray-10 w-full" onClick={verify}>verify</button>
			{error && <span className='text-red-77'>invalid code, please retry ..</span>}
		</div>
	)
}

export default Login
