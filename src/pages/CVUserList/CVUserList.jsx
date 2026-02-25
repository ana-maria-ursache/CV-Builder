import './CVUserList.css';
import { useSelector } from 'react-redux';

export default function CVUserList() {
  const { currentUser } = useSelector((state) => state.user);

  
  return <>CVUserList</>;
}

