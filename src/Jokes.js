import * as React from 'react'
import Axios from 'axios';
import { Button } from '@mui/material';
import './Jokes.css'


const Jokes = () => {

    const [jokesCategory, setJokesCategory] = React.useState([])
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [categoryHeading , setCategoryHeading] = React.useState('Animal')
    const [joke,setJoke]= React.useState('')
   
  
    


    React.useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => await Axios.get('https://api.chucknorris.io/jokes/categories').then(result => {
       setJokesCategory(result.data)

    })

    const userSelectedCategory = async (item, index) => {
        setCategoryHeading(item)
        console.log(categoryHeading,item);
        await Axios.get(`https://api.chucknorris.io/jokes/random?category=${item}`).then(
            result => {

                setJoke(result.data.value)
                     for (const eachCategory of jokesCategory) {
                        if (eachCategory === item) {
                            setSelectedCategory(!selectedCategory)   
                            console.log(selectedCategory)
                        }
                    
                     }
                    
              
            }
        ).catch(error => {
            console.log(error)
        })
    }

   



    return (
        <div>
          <h2>Chuck Norris</h2>

         <div className='container'>
             
            {
                jokesCategory.map((item, index) => (
                    <div className='container-one' key={index}>
                       
                        <Button
                            style={{ maxWidth: '80px', maxHeight: '60px', minWidth: '40px', minHeight: '30px' }}
                            variant={categoryHeading === item ? 'contained' : 'outlined'}
                            onClick={() => userSelectedCategory(item, index)}>
                            {item}
                        </Button>
                    </div>
                ))
            }
              </div>
              <br />

             
            
            {selectedCategory !== '' && joke && (
                 <div>
                     <h3>Selected Category :{categoryHeading} </h3>
             <div className='jokes-box'>
                
                 <p>
        
               {joke}
                 </p>
               
                </div>
                </div>
            )}
             
            


        </div>

    )
}

export default Jokes