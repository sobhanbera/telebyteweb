import React, { Component } from "react";

class OtherStandardProfile extends Component {
	constructor() {
		super();
		this.state = {
			userdata: {
				about: "",
				education: {},
				email: "",
				expertise: "",
				follow: {
					followers: "",
					following: "",
				},
				facolor: "",
				fullname: "",
				location: "",
				profileImg: "",
				profileType: true,
				social: {
					github: "",
					linkedin: "",
					instagram: "",
					facebook: "",
					twitter: "",
				},
				status: "",
				username: "",
			},
			notFound: false,
			cannotLoadData: false,
			light: false,
			showLoading: true,
		};
	}

	render() {
		return <div>Other</div>;
	}
}

export default OtherStandardProfile;
