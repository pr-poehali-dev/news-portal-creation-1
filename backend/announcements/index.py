import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage announcements with moderation workflow
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with request_id attribute
    Returns: HTTP response dict with announcements data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        category = params.get('category', '')
        search = params.get('search', '')
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT id, title, author_name, text, status, category,
                   to_char(created_at, 'DD Mon YYYY') as date
            FROM announcements 
            WHERE status = 'approved'
        """
        
        conditions = []
        if category and category != 'all':
            conditions.append(f"category = '{category}'")
        
        if search:
            search_escaped = search.replace("'", "''")
            conditions.append(f"(title ILIKE '%{search_escaped}%' OR text ILIKE '%{search_escaped}%')")
        
        if conditions:
            query += " AND " + " AND ".join(conditions)
        
        query += " ORDER BY created_at DESC"
        
        cursor.execute(query)
        announcements = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps([dict(row) for row in announcements], ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        title = body_data.get('title', '')
        author_name = body_data.get('author', '')
        text = body_data.get('text', '')
        category = body_data.get('category', 'other')
        
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO announcements (title, author_name, text, category, status)
            VALUES (%s, %s, %s, %s, 'pending')
            RETURNING id
        """, (title, author_name, text, category))
        
        announcement_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'id': announcement_id,
                'message': 'Announcement submitted for moderation'
            }),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }