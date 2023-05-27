import './index.css'
import Siderbar from './components/Siderbar'
import Mainscreen from './components/Mainscreen'
import Update from './components/Update'
import AddNew from './components/AddNew'
import { useSelector } from 'react-redux'

function App() {
  const screen = useSelector((state) => state.screen.screen)

  return (
    <div className='flex'>
        <Siderbar/>
        {screen === 'projects' && <Mainscreen/>}
        {screen === 'update' && <Update/>}
        {screen === 'addNew' && <AddNew/>}
    </div>
  )
}

export default App