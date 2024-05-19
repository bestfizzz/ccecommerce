export default function User({params}){
    const id = params.userID
    return(
        <>
            <h1>{id}</h1>
        </>
    )
}