import Btn from './Btn'

const Header = (props) => {
	return (
		<header className="header">
			<Btn
				color="green"
				onSubmit={props.ShowComplaints}
				text="Show my complaints"
			/>
		</header>
	)
}

export default Header
