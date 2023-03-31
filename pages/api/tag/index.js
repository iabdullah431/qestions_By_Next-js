import dbConnect from '../../../utils/dbConnect'
import Tag from '../../../models/tag'

const handler = async (req, res) => {
    await dbConnect()
    switch (req.method) {
        case 'GET':
            res.status(200).json({
                data: await Tag.find()
            })            
        break
        case 'POST':
            const { name, slug, description } = req.body
            const tag = await Tag.create({ name, slug, description })
            res.status(201).json({
                data: tag
            })
        break
        default:
            res.status(405).json()
        break
    }
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

export default handler
