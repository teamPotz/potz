import Logo from '../components/ui/Logo';

function LoadingPage() {
  return (
    <div className='potz_container'>
      <div className='contents_container'>
        <Logo />
        <div style={{ textAlign: 'center' }}>Loading...</div>
      </div>
    </div>
  );
}

export default LoadingPage;
