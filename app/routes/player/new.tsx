import { Form } from "@remix-run/react";

export default function NewPlayer() {
  return (<div>
    <Form method="post">
      <label>
        <span>Name</span>
        <input type="text">

        </input>
      </label>
    </Form>
  </div>)
}
