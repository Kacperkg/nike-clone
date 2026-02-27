import { createFileRoute } from '@tanstack/react-router'
import ImageContainer from '../components/Image-container'

export const Route = createFileRoute('/')({ component: App })

function App() {

  return (
    <div className="min-h-screen">
      <div className='relative'>
        <VideoPlayer />
      </div>
      <div className='grid grid-cols-2 gap-4 w-full px-8 py-4'>
        <ImageContainer />
      </div>
    </div>
  )
}


function VideoPlayer() {
  return (
    <video autoPlay loop muted className="w-full h-auto object-cover">
      <source src="/public/hero.mp4" type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
  );
}


