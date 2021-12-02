export async function saveLog(data, type){
    return await fetch(`http://localhost:3000/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

}
