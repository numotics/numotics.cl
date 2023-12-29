export default function MDIcon(props) {
  return (
    <div {...props}>
      <span className={"mx-auto mdi " + props.icon}></span>
    </div>
  )
}
