import PropTypes from 'prop-types';

const Header = ({ text, color }) => {
  return <h1 className={`header ${color}`}>{text}</h1>;
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Header.defaultProps = {
  color: 'white',
};

export default Header;
