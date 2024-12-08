import "./singlePage.css"

import User from "../img/vector-users-icon.jpg";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import {Link} from "react-router-dom";
import Menu from "../Menu/Menu";
function SinglePage() {

  return (
    <div className="single-post">
     <div className="content">
      <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
     </div>
     <div className="user">
      <img src={User} alt="" />
      <div className="info">
        <span>Keita</span>
        <p>Posted 2 days ago</p>
      </div>
      <div className="edit">
        <Link to={`/write?edit=2`}>
          <img src={Edit} alt="" />
        </Link>
        <Link>
          <img src={Delete} alt="" />
        </Link>
      </div>
     </div>
     <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     </p>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti dolorum laudantium, iure nemo explicabo nostrum modi unde libero, accusamus eaque alias minus aperiam beatae numquam non ipsum? Quia, quis!
     </p>
     <h1>Other posts you may like</h1>
      <Menu />
    </div>
  );
}

export default SinglePage;


