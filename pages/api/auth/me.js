import auth from '../../../utils/auth'

const handler = (req, res) => {
    const { id, name, email } = req.user
    res.status(200).json({
        data: {
            id, name, email
        }
    })
}
export async function getServerSideProps(context) {
	// وظيفة للتحقق من ان المستخدم مسجل
	const logged = () => {
		// إذا كان مسجلاً نعيد true 
		return true
		// إذا لم يكن مسجلاً نعيد false 
		return false
	}
	if (logged()) {
		return {
			props: {}, // will be passed to the page component as props
		}
	} else return {
		redirect: {
			destination: '/login',
			permanent: false,
		},
	}
}
export default auth(handler)