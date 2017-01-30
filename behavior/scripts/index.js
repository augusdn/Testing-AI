'use strict'

exports.handle = function handle(client) {
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('welcome')
      client.addResponse('provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })

  const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('greeting')
      client.done()
    }
  })

  const handleGoodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('goodbye')
      client.done()
    }
  })

  const handleRequest = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('req_name')
      client.done()
    }
  })

  const handleProv = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('prov_name')
      client.done()
    }
  })

  const handleconf = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('conf_name')
      client.done()
    }
  })


  const handleBot = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('bot_name')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
      goodbye: 'goodbye',
      greeting: 'greeting',
	  greeting_bot/name: 'bot_name',
	  request_name/name: 'req_name',
	  provide_name/name: 'prov_name',
	  confirm_name/name: 'conf_name'
    },
    streams: {
      goodbye: handleGoodbye,
      greeting: handleGreeting,
	  greeting_bot/name: handleBot,
	  request_name/name: handleRequest,
	  provide_name/name: handleProv,
	  confirm_name/name: handleconf,
	  
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained]
    }
  })
}
