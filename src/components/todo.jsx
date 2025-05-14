import axios from 'axios'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { ApiUrl } from '../App'
import LoadingDelete from './loader/loader-delete'

function Todo({ todo, getTodos }) {
	const [loading,setLoading] = useState(false)
	async function deleteTodo(id) {
		try {
			setLoading(true)
			await axios.delete(`${ApiUrl}/${id}`)
			getTodos()
			setLoading(false)
		} catch (error) {
			console.error(error)
		}
	}
	async function checked(id) {
		try {
			await axios.put(`${ApiUrl}/${id}`, { ...todo, completed: !todo.completed })
			getTodos()
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<tr className='border-b-[2px] py-[10px]'>
			<td className="py-2 px-4">{todo.id}</td>
			<td className={`py-2 px-4 ${todo.completed ? "line-through" : ""}`}>{todo.title}</td>
			<td className={`px-[10px] w-[30px] py-[2px] rounded-md text-white font-bold text-center ${todo.completed ? "bg-green-500" : "bg-red-500"}`}>
				{todo.completed ? "Active" : "Inactive"}
			</td>
			<td className=''>
				<div className='flex pl-18 gap-[10px] items-center'>
					{loading ? (<LoadingDelete/>) : (
						<Trash2 onClick={() => deleteTodo(todo.id)} size={25} color='red' fill='red' className='cursor-pointer' />
					)}
					<input type="checkbox" className='cursor-pointer w-[20px] h-[20px]' checked={todo.completed} name="" id="" onChange={() => checked(todo.id)} />
				</div>
			</td>
		</tr>
	)
}

export default Todo
