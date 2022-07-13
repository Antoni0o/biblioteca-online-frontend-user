import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Navbar } from '../src/components/NavBar'
import { useAuth } from '../src/hooks/useAuth';

const Home: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) {
      router.push('/404');
    }
  }, [])

  return (
    <>
      {user?.id &&
        <>
          <Navbar user={user} />
          <h1>Teste</h1>
        </>
      }
    </>
  )
}

export default Home
