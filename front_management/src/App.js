import './css/App.css';
import {Routes, Route} from 'react-router-dom';

import { MainPage } from './pages/MainPage';
import {Teams} from './pages/Teams'
import { AddFixedAsset } from './pages/AddFixedAsset';
import { UpdateFixedAsset } from './pages/UpdateFixedAsset';
import { Expenses } from './pages/Expenses';
import { Categories } from './pages/Categories';

import { Error } from './pages/Error';
import { FixedAsset } from './pages/FixedAsset';
import { Settings } from './pages/Settings';
import { Accounts } from './pages/Accounts';

export default function App() {
return ( 
 

  <Routes>
      <Route path="/addFixedAsset/:category/:id" element={<AddFixedAsset />} />
      <Route path="/updateFixedAsset/:id" element={<UpdateFixedAsset />} />
      <Route path="/expences" element={<Expenses/>} />
      <Route path="/categories" element={ <Categories/>}/>
      <Route path="/settings" element={<Settings />} />
      <Route path="/accounts" element={<Accounts />} />

      <Route path ="/fixedAsset/:category/:id" element = {<FixedAsset />} />
      <Route path="/teams" element={<Teams/>}></Route> 
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Error />}/>



  </Routes>

);

}

