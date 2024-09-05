import { createLazyFileRoute } from '@tanstack/react-router';
import cx from "classnames"

export const Route = createLazyFileRoute('/about')({ 
  component: About,
})

function About() {
  return <div className={cx()}>Hello from About!
  
    </div>
}