import React from 'react';
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '36px',
    flexDirection: 'column',
  }

  return (
    <div style={containerStyle}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className='flex justify-center  mt-[200px] w-[500px] h-[100px] rounded-full bg-gray-10'>
        <Link className='mt-[20px]' to="/UserPage">BACK HOME</Link>
      </button>
    </div>
  )
}

export default PageNotFound;
