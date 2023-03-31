import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '../site-settings/theme'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main}/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap"
                        rel="stylesheet"/>
                </Head>
                <body dir="rtl">
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {

    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
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