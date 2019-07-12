import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {connect} from 'react-redux'
import {onLogout} from './../redux/actions'
import { Link } from 'react-router-dom'

// const objCookie= new teraserah ()
class Example extends React.Component {

  constructor (props){
    super(props)
    
    this.toggle=this.toggle.bind(this);
    this.state = {
      isOpen:false
    }
  }
  
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onBtnLogoutClick = () => {
    this.props.onLogout()
    localStorage.removeItem('userData')
    // objCookie.remove('terserah')
    this.props.resetUser()
    this.props.resetCount()
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
           <Link to='/'> <NavbarBrand>JagoMovie</NavbarBrand> </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" text-color='white' navbar>
              <NavItem>
                <Link to="/cart"><NavLink  style={{fontSize:"14px"}}><i class="fas fa-shopping-cart"></i>{this.props.cart} Cart </NavLink></Link>
              </NavItem>
              <NavItem>
               <Link to='/register'> <NavLink>Join Now</NavLink></Link>
              </NavItem>
              
              {
              this.props.name !== ""
              ?
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.name}
                </DropdownToggle>
                <DropdownMenu right>
                <Link to='history'> <DropdownItem>
                    Histori Transaksi
                </DropdownItem></Link>
                  <DropdownItem>
                    Edit Profil
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onBtnLogoutClick}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              null
            }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name : state.user.username
  }
}

export default connect(mapStateToProps , {onLogout})(Example)