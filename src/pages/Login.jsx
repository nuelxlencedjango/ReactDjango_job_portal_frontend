import React from 'react'
import Form from "../Compos/Form";

function Login() {
 

  return (
<div>
   <Form route="/api/token/" method ="login" />
</div>
  )
}

export default Login;



