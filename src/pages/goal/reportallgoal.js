import React, { Component } from "react";
import axios from "axios";
import CommonApi from "../../api/common-api"
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

import ProgressBar from "bootstrap-progress-bar";
import DateTimeField from "react-bootstrap-datetimepicker";


const initialState = {
  id: null,
  goalName: "",
  description: "",
  startDate: "",
  endDate: "",
  categoryID: 0,
  circleID: 0,
  checklists: [{value: null}],
  dataSearch: null
};

class ReportAllGoal extends Component { 

 
    
    render() {
      return (
        <section id="main-content">
          <section className="wrapper">
          <section className="wrapper site-min-height">
          	<h3><i className="fa fa-angle-right"></i> Discover Our Panels</h3>
          	<div className="row mt">
          		<div className="col-lg-12">

					<div className="row">
						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="twitter-panel pn">
								<i className="fa fa-twitter fa-4x"></i>
								<p>Dashgum is here! Take a look and enjoy this new Bootstrap Dashboard theme.</p>
								<p className="user">@Alvrz_is</p>
							</div>
						</div>
		
						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="white-panel pn">
								<div className="white-header">
									<h5>TOP USER</h5>
								</div>
								<p><img src="/theme/img/ui-zac.jpg" className="img-circle" width="50" /></p>
								<p><b>Zac Snider</b></p>
									<div className="row">
										<div className="col-md-6">
											<p className="small mt">MEMBER SINCE</p>
											<p>2012</p>
										</div>
										<div className="col-md-6">
											<p className="small mt">TOTAL SPEND</p>
											<p>$ 47,60</p>
										</div>
									</div>
							</div>
						</div>
						
						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="instagram-panel pn">
								<i className="fa fa-instagram fa-4x"></i>
								<p>@THISISYOU<br></br>
									5 min. ago
								</p>
								<p><i className="fa fa-comment"></i> 18 | <i className="fa fa-heart"></i> 49</p>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="steps pn">
							    <input id="op1" name="op1" type="checkbox" checked="" />
							    <label for="op1">Update Profile</label>
							    <input id="op2" name="op2" type="checkbox"/>
							    <label for="op2">Contact Paul</label>
							    <input id="op3" name="op3" type="checkbox"/>
							    <label for="op3">Enjoy Life</label>
							    <input type="submit" value="All Done!" id="submit" />
							</div>
						</div>

						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="content-panel pn">
								<div id="profile-01">
									<h3>Sharon Holmes</h3>
									<h6>WEB DESIGNER</h6>
								</div>
								<div className="profile-01 centered">
									<p>ADD TO CONTACT LIST</p>
								</div>
								<div className="centered">
									<h6><i className="fa fa-envelope"></i><br></br>SHARON@DASHGUMTHEME.COM</h6>
								</div>
							</div>
						</div>
						
						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="content-panel pn">
								<div id="profile-02">
									<div className="user">
										<img src="/theme/img/friends/fr-06.jpg" className="img-circle" width="80" />
										<h4>DJ SHERMAN</h4>
									</div>
								</div>
								<div className="pr2-social centered">
									<a href="#"><i className="fa fa-twitter"></i></a>
									<a href="#"><i className="fa fa-facebook"></i></a>
									<a href="#"><i className="fa fa-dribbble"></i></a>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="product-panel-2 pn">
								<div className="badge badge-hot">HOT</div>
								<img src="/theme/img/product.jpg" width="200" alt="" />
								<h5 className="mt">Flat Pack Heritage</h5>
								<h6>TOTAL SALES: 1388</h6>
								<button className="btn btn-small btn-theme04">FULL REPORT</button>
							</div>
						</div>
						
	
						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="content-panel pn">
								<div id="spotify">
									<div className="col-xs-4 col-xs-offset-8">
										<button className="btn btn-sm btn-clear-g">FOLLOW</button>
									</div>
									<div className="sp-title">
										<h3>LORDE</h3>
									</div>
									<div className="play">
										<i className="fa fa-play-circle"></i>
									</div>
								</div>
								<p className="followers"><i className="fa fa-user"></i> 576,000 FOLLOWERS</p>
							</div>
						</div>
					

						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="content-panel pn">
								<div id="blog-bg">
									<div className="badge badge-popular">POPULAR</div>
									<div className="blog-title">Incredible Title</div>
								</div>
								<div className="blog-text">
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <a href="#">Read More</a></p>
								</div>
							</div>
						</div>
					</div>
          		
        
					<div className="row">
						<div className="col-md-4 col-sm-4 mb">
							<div className="green-panel pn">
								<div className="green-header">
									<h5>REVENUE</h5>
								</div>
								<div className="chart mt">
									<div className="sparkline" data-type="line" data-resize="true" data-height="75" data-width="90%" data-line-width="1" data-line-color="#fff" data-spot-color="#fff" data-fill-color="" data-highlight-line-color="#fff" data-spot-radius="4" data-data="[200,135,667,333,526,996,564,123,890,464,655]"><canvas width="316" height="75" styles="display: inline-block; width: 316px; height: 75px; vertical-align: top;"></canvas></div>
								</div>
								<p className="mt"><b>$ 17,980</b><br></br>Month Income</p>
							</div>
						</div>
					
                      	<div className="col-md-4 col-sm-4 mb">
					        <div className="stock card">
					        	<div className="stock-chart">
					            	<div id="chart"></div>
								</div>
								<div className="stock current-price">
									<div className="row">
						        		<div className="info col-sm-6 col-xs-6"><abbr>AAPL</abbr>
						            		<time>Yesterday</time>
										</div>
									<div className="changes col-sm-6 col-xs-6">
										<div className="value up"><i className="fa fa-caret-up hidden-sm hidden-xs"></i> 694.00</div>
										<div className="change hidden-sm hidden-xs">+4.95 (3.49%)</div>
									</div>
									</div>
								</div>
								<div className="summary">
					            	<strong>18.3 M</strong> <span>SHARES TRADED</span>
								</div>
					        </div>
						</div>
						
                      	<div className="col-md-4 col-sm-4 mb">
                      		<div className="darkblue-panel pn">
                      			<div className="darkblue-header">
						  			<h5>SITE STATICS</h5>
                      			</div>
                      			<h1 className="mt"><i className="fa fa-user fa-3x"></i></h1>
								<p>+ 1,789 NEW VISITS</p>
								<footer>
									<div className="centered">
										<h5><i className="fa fa-trophy"></i> 17,988</h5>
									</div>
								</footer>
                      		</div>
                      	</div>
                    </div>

					<div className="row">
                      	<div className="col-md-4 col-sm-4 mb">
							<div className="weather pn">
								<i className="fa fa-cloud fa-4x"></i>
								<h2>11º C</h2>
								<h4>BUDAPEST</h4>
							</div>
						</div>
						

						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="weather-2 pn">
								<div className="weather-2-header">
									<div className="row">
										<div className="col-sm-6 col-xs-6">
											<p>NEW YORK</p>
										</div>
										<div className="col-sm-6 col-xs-6 goright">
											<p className="small">Thu Apr 14, 2014</p>
										</div>
									</div>
								</div>
								<div className="row centered">
									<img src="/theme/img/ny.jpg" className="img-circle" width="120" />			
								</div>
								<div className="row data">
									<div className="col-sm-6 col-xs-6 goleft">
										<h4><b>16 ºC</b></h4>
										<h6>21º max</h6>
										<h6>8º min</h6>
									</div>
									<div className="col-sm-6 col-xs-6 goright">
										<h5><i className="fa fa-sun-o fa-2x"></i></h5>
										<h6><b>Sunny</b></h6>
										<h5>7:15 am</h5>
									</div>
								</div>
							</div>
						</div>
						
						<div className="col-lg-4 col-md-4 col-sm-4 mb">
							<div className="weather-3 pn centered">
								<i className="fa fa-sun-o"></i>
								<h1>30º C</h1>
								<div className="info">
									<div className="row">
											<h3 className="centered">MADRID</h3>
										<div className="col-sm-6 col-xs-6 pull-left">
											<p className="goleft"><i className="fa fa-tint"></i> 13%</p>
										</div>
										<div className="col-sm-6 col-xs-6 pull-right">
											<p className="goright"><i className="fa fa-flag"></i> 15 MPH</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					
          		</div>
          	</div>
			


          </section>
          </section>
        </section>
      );
    }
  }
  
  export default ReportAllGoal ;