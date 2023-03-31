import dbConnect from 'utils/dbConnect'
import Post from 'models/post'

const handler = async (req, res) => {
    await dbConnect()
    const {page, sort, tag} = req.query
    const where = tag ? {tags: {$in: [tag]}} : {}

    const {items, pages} = await Post.paginate({page, sort, where})

    res.status(200).json({
        data: {
            items, pages, page
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
export default handler