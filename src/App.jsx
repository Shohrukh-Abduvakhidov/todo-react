/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Todo from './components/todo'
import Loading from './components/loader/loader'
export const ApiUrl = import.meta.env.VITE_APITODOS_URL

const App = () => {
  const [todos, setTodos] = useState([])
  const [seeAll, setSeeAll] = useState(false)
  const [loading, setLoading] = useState(true)
  async function getTodos() {
    try {
      const { data } = await axios.get(ApiUrl)
      setTodos(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <header className="w-[90%] m-auto py-4 flex justify-between in-checked:">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button onClick={() => setSeeAll(!seeAll)} className='bg-blue-500 px-[20px] py-[5px] rounded-md text-white font-bold cursor-pointer'>{seeAll ? "Hide Todos" : "See All Todos"}</button>
      </header>

      <div className="w-[75%] m-auto mt-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 pl-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loading />
            ) : (
              (seeAll ? todos : todos.slice(0, 10))?.length === 0 ? (
                <p>Not found</p>
              ) : (
                (seeAll ? todos : todos.slice(0, 10)).map((todo) => (
                  <Todo key={todo.id} todo={todo} getTodos={getTodos} />
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
