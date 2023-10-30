import styled from "@emotion/styled"

const Div = styled('div')`
    background: rgba(3, 98, 171, 0.3);
`
const Title = styled('h2')`
    padding: 16px;
    margin: 0;
    user-select: none;
    cursor: default;
`

function Navbar() {
  return (
    <Div>
        <Title>My Phone Book ✨</Title>
    </Div>
  )
}

export default Navbar