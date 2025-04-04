async function a(){}
export async function rc3(i = 0){
    await a();
    console.log(i);
    rc3(i+1);
}
