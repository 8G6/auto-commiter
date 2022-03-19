let   {exec}               = require('child_process')  
const {promisify}          = require('util')
const exe                  = promisify(exec)
const {watchFile,
       readdir,
       }                   = require('fs');

let dir = 'D:\\Programing\\coding\\HTML5\\basics\\matrix'

async function ip4(){
    let bool = true
    try{
        const {stdout} = await exe('ipconfig | findstr IPv4')
        let ip  = stdout.split(':')[1]
        console.log(`connected to internet \n IP adress ${ip}`)
    }
    catch(e){
        console.log('Not connected')
        bool=false
    }
    return bool
    
}
let c=0
async function run(){

    
    const {stdout} = await exe(`cd ${dir} && dir /b`)
    let arr        = stdout.split('\n').filter(n=>n)
    let out=''
    for(i=0;i<arr.length;i++){
        if(arr[i].split('.').length==1){
            let {stdout} = await exe(`cd ${dir} && cd ${arr[i]} && dir /b/s`)
            out+=stdout.split('\n').filter(n=>n).join('\n')
            await exe('cd ..')
        }
        else{
            out+='\n'+arr[i]+'\n'
        }
    }
    out=out.split('\n').filter(n=>n)
    let dirs = []
    let = 0;
    out.forEach(n=>{
        dirs.push(n.split('\r')[0])
    })
    dirs.forEach(n=>{
        watchFile(n, async(curr, prev) => {
            console.log(`${n} modified at ${curr.mtime}`)
            console.log('Checking internet')
            if(await ip4()){
               try{
                n=n.split('\\')
               }
              catch(e){}
                console.log(`uprepo auto-update-${n[n.length-1].length!=1 ? n[n.length-1]: n}(${curr.mtime.toString().split(' ')[4]})`)
                const {stdout} = await exe(`uprepo auto-update-${n[n.length-1].length!=1 ? n[n.length-1]: n}(${c})`)
                console.log(stdout)
            }
            else{
                
            }
        
        });
        
    })
    

}

run()