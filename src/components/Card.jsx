/* eslint-disable react/prop-types */
export const Card = ({name, desc, value, categoria, image, status}) => {
  var a = '🔴'
  if (status) {
    a = '🟢'
  }
  
    return(
      <div style={{backgroundColor:'grey', margin:'20px', padding:'20px', borderRadius:'10px'}}>
            <h1>{name}</h1>
            <h2>{desc}</h2>
            <p>{value}</p>
            <p>{categoria}</p>
            <p>{a}</p>
            <img src={image} alt={name} width={150} height={"auto"}/>
        </div>
    )

}