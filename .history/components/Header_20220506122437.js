import Link from 'next/link'
import {AUTH_TOKEN} from '../constants'
import Cookies from 'js-cookie'

const Header = () => {
 const authToken = localStorage.getItem(AUTH_TOKEN)
 const navigate = useNavigate()

  return (
    <div className='flex pa1 justify-between nowrap orange'>
      <div className='flex flex-fixed black'>
        <Link href='/' className='no-underline black'>
          <div className='fw7 mr1'>
            <a> Hacker News</a>
          </div>
        </Link>
        <Link href='/' className='ml1 no-underline black'>
          <a>new</a>
        </Link>
        <div className='ml1'>|</div>
        <Link href='/create' className='ml1 no-underline black'>
          <a>submit</a>
        </Link>
        <Link href='/search' className='ml1 no-underline black'>
          <a>Search</a>
        </Link>
        <div className='ml1'>|</div>
        <Link href='/login' className='ml1 no-underline black'>
          <a>Login</a>
        </Link>
      </div>

      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            logout
          </div>
        ) : (
          <Link
            href="/login"
            className="ml1 no-underline black"
          >
            login
          </Link>
        )}
      </div>
    {/* </div> */}
    </div>
  )
}

export default Header
