import { Loader } from 'lucide-react'

const loading = () => {
  return (
    <div className='mt-[10vh] flex justify-center'>
        <Loader className='animate-spin w-6 h-6 md:w-8 md:h-8'/>
    </div>
  )
}

export default loading