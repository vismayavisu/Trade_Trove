import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import categories from './CategoriesList';

function Categories(props) {

    const navigate = useNavigate();

    return (
        <div className='cat-container'>
            <div>
                <h4><span className='pr-3'>All Categories</span></h4>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span onClick={() => navigate('/category/' + item)} key={index} className='category'> {item} </span>
                        )
                    })}
            </div>
        </div>
    )
}


export default Categories;