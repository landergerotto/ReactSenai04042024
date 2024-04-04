/* eslint-disable react/prop-types */
export const ApiCard = ({name, status, species, type, gender, image}) => {
    var a = '🔴'
    if (status == 'Alive') {
      a = '🟢'
    }
    
    return(
    <div>
            <h1>{name}</h1>
            <h2>{species}</h2>
            <p>{type}</p>
            <p>{gender}</p>
            <p>{a}</p>
            <img src={image} alt={name} width={150} height={"auto"}/>
        </div>
    )  
}