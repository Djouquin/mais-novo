import tessarisLogo from '../assets/logo.svg';
import hobLogo from '../assets/hobsemfundo.png';

interface Props {
    title: string;
}
const Header = ({title}:Props)=>{
    return(
        <div className='flex justify-between items-center overflow-visible' >
            <h1 
                className="text-3xl font-bold text-blue-900">{title}
            </h1>
            
            <div className='flex gap-x-10 items-center'>
                <img className='size-30' src= {tessarisLogo}></img>
                <img className='size-30' src= {hobLogo}></img>
            </div>
        </div>
    );
}
export default Header;