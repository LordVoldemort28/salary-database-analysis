export default async function queryAPI(query){
    const response = await fetch(`query?q=${query}`).
    then(data => {return data.json()})
};