import { Link, useMatch, useResolvedPath } from 'react-router-dom'


type CustomLinkProps = {
  to: string
  children: any
}


export function CustomLink({
  to,
  children,
  ...props
}: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li>
      <Link className={isActive ? 'active' : ""} to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
