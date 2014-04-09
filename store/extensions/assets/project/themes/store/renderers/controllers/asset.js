var render = function(theme, data, meta, require) {

	var session = meta.session;

	var appMSAMLResponse = session.get('APPM_SAML_RESPONSE');
	data.asset.attributes['appMSAMLResponse'] = appMSAMLResponse;

	theme('1-column', {
		title : data.title,
		
		header: [
					{
						partial: 'header',
						context: data.header
					}
				],
				navigation: [
					{
						partial: 'navigation',
						context: require('/helpers/navigation.js').currentPage(data.navigation, data.type, data.search)
					}
				],
		
        body : [{
            partial : 'asset',
            context : require('/helpers/asset.js').format({
                user : data.user,
                sso : data.sso,
                asset : data.asset,
                type : data.type,
                inDashboard : data.inDashboard,
                embedURL : data.embedURL,
                isSocial : data.isSocial
            })
        }]
	});
};
