"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function TestSendGridPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    details?: any
  } | null>(null)
  
  const { toast } = useToast()

  const handleTestEmail = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/test-sendgrid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toEmail: email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: data.message,
          details: data.details
        })
        
        toast({
          title: "Success!",
          description: "Test email sent successfully. Check your inbox!",
        })
      } else {
        throw new Error(data.error || 'Failed to send test email')
      }
    } catch (error) {
      console.error('Test email error:', error)
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send test email'
      })
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send test email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1c1c1d] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-4">SendGrid Test</h1>
          <p className="text-gray-400">
            Test your SendGrid setup by sending a verification email
          </p>
        </div>

        <Card className="bg-[#242728] border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Test Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#18191b] border-gray-700 text-white placeholder-gray-400 focus:border-[#ce001f]"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleTestEmail}
              disabled={isLoading || !email}
              className="w-full bg-[#ce001f] hover:bg-[#b3001a] disabled:bg-gray-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending Test Email...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Test Email
                </>
              )}
            </Button>

            {result && (
              <div className={`mt-4 p-4 rounded-lg border ${
                result.success 
                  ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                <div className="flex items-start gap-3">
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium">{result.message}</div>
                    {result.details && (
                      <div className="text-sm mt-2 text-gray-300">
                        <div><strong>To:</strong> {result.details.to}</div>
                        <div><strong>From:</strong> {result.details.from}</div>
                        <div><strong>Subject:</strong> {result.details.subject}</div>
                        <div><strong>Time:</strong> {new Date(result.details.timestamp).toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 space-y-4">
          <Card className="bg-[#242728] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-[#ce001f] font-bold">1.</span>
                <span>Make sure you have set up your SendGrid API key in environment variables</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#ce001f] font-bold">2.</span>
                <span>Verify your sender email address in SendGrid dashboard</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#ce001f] font-bold">3.</span>
                <span>Enter your email address above and click "Send Test Email"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#ce001f] font-bold">4.</span>
                <span>Check your inbox for the test email</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#242728] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Environment Variables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="bg-[#18191b] p-3 rounded border border-gray-700">
                <code className="text-green-400">SENDGRID_API_KEY=your-sendgrid-api-key</code>
              </div>
              <div className="bg-[#18191b] p-3 rounded border border-gray-700">
                <code className="text-green-400">FROM_EMAIL=your-verified-email@domain.com</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 