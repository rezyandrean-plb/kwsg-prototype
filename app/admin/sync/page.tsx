'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, RefreshCw, Download, Upload, Database } from 'lucide-react';

interface SyncStats {
  created: number;
  updated: number;
  deleted: number;
}

interface SyncResult {
  success: boolean;
  message: string;
  count?: number;
  stats?: SyncStats;
}

export default function SyncPage() {
  const [bucketName, setBucketName] = useState('');
  const [csvKey, setCsvKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [status, setStatus] = useState<any>(null);

  const handleSync = async (endpoint: string, description: string) => {
    if (!bucketName || !csvKey) {
      setResult({ success: false, message: 'Please provide bucket name and CSV key' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/sync/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bucketName, csvKey }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: `Failed to ${description}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetStatus = async () => {
    if (!bucketName || !csvKey) {
      setResult({ success: false, message: 'Please provide bucket name and CSV key' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/sync/status?bucketName=${encodeURIComponent(bucketName)}&csvKey=${encodeURIComponent(csvKey)}`);
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      setResult({
        success: false,
        message: `Failed to get status: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Database Sync Management</h1>
        <p className="text-muted-foreground">
          Manage CSV import/export and sync operations with S3
        </p>
      </div>

      <div className="grid gap-6">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>S3 Configuration</CardTitle>
            <CardDescription>
              Configure your S3 bucket and CSV file details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bucketName">Bucket Name</Label>
              <Input
                id="bucketName"
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
                placeholder="your-bucket-name"
              />
            </div>
            <div>
              <Label htmlFor="csvKey">CSV Key</Label>
              <Input
                id="csvKey"
                value={csvKey}
                onChange={(e) => setCsvKey(e.target.value)}
                placeholder="projects.csv"
              />
            </div>
            <Button onClick={handleGetStatus} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
              Get Status
            </Button>
          </CardContent>
        </Card>

        {/* Status */}
        {status && (
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Database Records</Label>
                  <p className="text-2xl font-bold">{status.status?.databaseCount || 0}</p>
                </div>
                <div>
                  <Label>Last Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    {status.status?.lastSync ? new Date(status.status.lastSync).toLocaleString() : 'Never'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Smart Sync
              </CardTitle>
              <CardDescription>
                Sync database with CSV (create, update, delete based on slug)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleSync('sync', 'sync database')}
                disabled={loading}
                className="w-full"
                variant="default"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Sync Database
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Replace All Data
              </CardTitle>
              <CardDescription>
                ⚠️ Replace ALL database data with CSV data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleSync('replace', 'replace all data')}
                disabled={loading}
                className="w-full"
                variant="destructive"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                Replace All Data
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Export to S3
              </CardTitle>
              <CardDescription>
                Export current database to CSV and upload to S3
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleSync('export', 'export database')}
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Export to S3
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download CSV
              </CardTitle>
              <CardDescription>
                Generate and download current database as CSV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  // This would need a separate endpoint to generate CSV for download
                  setResult({ success: false, message: 'Download feature not implemented yet' });
                }}
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Operation Result</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className={result.success ? 'border-green-500' : 'border-red-500'}>
                <AlertDescription>
                  <div className="font-medium mb-2">
                    {result.success ? '✅ Success' : '❌ Error'}
                  </div>
                  <p>{result.message}</p>
                  {result.count && (
                    <p className="mt-2 text-sm">
                      <strong>Records processed:</strong> {result.count}
                    </p>
                  )}
                  {result.stats && (
                    <div className="mt-2 text-sm grid grid-cols-3 gap-4">
                      <div>
                        <strong>Created:</strong> {result.stats.created}
                      </div>
                      <div>
                        <strong>Updated:</strong> {result.stats.updated}
                      </div>
                      <div>
                        <strong>Deleted:</strong> {result.stats.deleted}
                      </div>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}






